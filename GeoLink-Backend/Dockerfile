# Use an official OpenJDK runtime as the base image
FROM openjdk:23-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Spring Boot jar file to the container
COPY target/GeoLink-Backend-0.0.1-SNAPSHOT.jar /app/GeoLink-Backend-0.0.1-SNAPSHOT.jar

# Expose the port your app will run on (default is 8080 for Spring Boot)
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "GeoLink-Backend-0.0.1-SNAPSHOT.jar"]
