# Use Python 3.11 as the base image
FROM python:3.11

# Set the working directory inside the container
WORKDIR /app

# Install the required packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the source code
COPY . .

# Expose the port
EXPOSE 8000

# Command to run FastAPI with hot-reloading enabled
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--reload"]
