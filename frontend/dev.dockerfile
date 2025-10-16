FROM node:20.13.1-alpine AS build
ENV TZ=UTC
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/build .

COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 3000;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]