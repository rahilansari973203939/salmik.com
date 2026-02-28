# Spring Boot Microservices

This project contains the backend microservices architecture for BrushRiceMart e-commerce application.

## Services

| Service          | Port | Description                    |
| ---------------- | ---- | ------------------------------ |
| eureka-server    | 8761 | Service Discovery              |
| api-gateway      | 8080 | API Gateway                    |
| auth-service     | 8081 | Authentication & Authorization |
| product-service  | 8082 | Product Management             |
| order-service    | 8083 | Order Management               |
| cart-service     | 8084 | Shopping Cart                  |
| customer-service | 8085 | Customer Management            |
| category-service | 8086 | Category Management            |
| contact-service  | 8087 | Contact Form Submissions       |

## Quick Start

### Prerequisites

- Java 17+
- Maven 3.8+
- Docker (optional)

### Running Services

1. Start Eureka Server:

```
bash
cd eureka-server
mvn spring-boot:run
```

2. Start API Gateway:

```
bash
cd api-gateway
mvn spring-boot:run
```

3. Start Microservices (in any order):

```
bash
cd auth-service && mvn spring-boot:run
cd product-service && mvn spring-boot:run
# ... etc
```

## API Endpoints

### Auth Service

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/send-otp
- POST /api/auth/verify-otp

### Product Service

- GET /api/products
- GET /api/products/{id}
- POST /api/products
- PUT /api/products/{id}
- DELETE /api/products/{id}

### Order Service

- GET /api/orders
- GET /api/orders/{id}
- POST /api/orders
- PUT /api/orders/{id}/status

### Cart Service

- GET /api/cart/{userId}
- POST /api/cart
- PUT /api/cart/{id}
- DELETE /api/cart/{id}

### Customer Service

- GET /api/customers
- GET /api/customers/{id}
- POST /api/customers
- PUT /api/customers/{id}

### Category Service

- GET /api/categories
- POST /api/categories

### Contact Service

- POST /api/contact
- GET /api/contact
