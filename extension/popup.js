document.getElementById("checkButton").addEventListener("click", async () => {
  const urlInput = document.getElementById("urlInput").value;
  const resultDiv = document.getElementById("result");

  if (!urlInput) {
    resultDiv.innerHTML = "Please enter a URL or domain.";
    return;
  }

  resultDiv.innerHTML = "Checking...";
  try {
    const response = await fetch(`http://localhost:8000/check?q=${encodeURIComponent(urlInput)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch from server.");
    }
    const data = await response.json();

    if (data.result === "suspicious" && data.source === "API") {
      const usomData = data.data;
      resultDiv.innerHTML = `
              ⚠️ <b>Suspicious</b>: ${usomData.url}<br>
              Criticality Level: ${usomData.criticality_level}<br>
              <a style="color:#b91c1c;" target="_blank" href="https://www.usom.gov.tr/adres/${usomData.id}">Reason</a>
            `;
      resultDiv.style.color = "#b91c1c";
    } else if (data.source === "whitelist") {
      resultDiv.innerHTML = `Root domain is whitelisted<br>✅ <b>Safe</b>: ${data.domain}`;
      resultDiv.style.color = "#16a34a";
    } else if (data.source === "Blacklist") {
      resultDiv.innerHTML = `
            ⚠️ <b>Suspicious</b>: ${data.domain}<br>
            Reason: ${Array.isArray(data.data) ? data.data.map((entry) => entry.reason || "Unknown").join(", ") : "Unknown"}
          `;
      resultDiv.style.color = "#eb7725";
    } else if (data.source === "Model") {
      resultDiv.innerHTML = `⚠️ <b>${data.result} (%${data.data.phishing_score})</b><br>
      ${data.data.domain}<br>
      is considered ${data.result} by ML model.
      `;
      if (data.data.phishing_score <= 25) {
        resultDiv.style.color = "#16a34a";
      } else if (data.data.phishing_score <= 50) {
        resultDiv.style.color = "#e1b20f";
      } else if (data.data.phishing_score <= 75) {
        resultDiv.style.color = "#eb7725";
      } else {
        resultDiv.style.color = "#b91c1c";
      }
    }
  } catch (error) {
    resultDiv.innerHTML = `Error: ${error.message}`;
  }
});
