# PHASE REPORT

## LIVE AZURE URLS

### FRONTEND  
**https://tasktidy-frontend-gumutoni.azurewebsites.net**

### BACKEND  
**https://tasktidy-backend-gumutoni.azurewebsites.net**

---

## LIVE PUBLIC URL

- **Frontend:**  
  [https://tasktidy-frontend-gumutoni.azurewebsites.net](https://tasktidy-frontend-gumutoni.azurewebsites.net)

---

## SCREENSHOTS
![alt text](<Screenshot 1.png>) 

![alt text](<Screenshot 2.png>)


---

## REFLECTION

### Challenges of Infrastructure as Code (IaC) and Manual Deployment

- **IaC Complexity:**  
  Writing Terraform scripts for Azure resources required careful attention to resource dependencies, variable management, and Azure-specific configuration. Debugging errors in resource creation and updating was sometimes time-consuming.

- **Manual Deployment:**  
  Manually building, tagging, and pushing Docker images, then updating Azure App Service to use the new images, introduced the risk of human error (e.g., forgetting to rebuild or restart the service). Ensuring the latest image was actually deployed sometimes required extra steps, such as using unique tags or restarting the app.

- **Configuration Drift:**  
  Manual changes in the Azure Portal can lead to configuration drift from the IaC definitions, making it harder to track the true state of the infrastructure.

- **Environment Variables:**  
  Managing environment variables securely and ensuring they are set correctly in both local and cloud environments was a key challenge.

- **Overall:**  
  IaC provides reproducibility and version control, but requires a learning curve and careful management. Manual deployment is straightforward for small projects but can become error-prone and less scalable as complexity grows.
