export const seedPosts = [
  {
    title: 'Modern Frontend Development: Building Reactive SPAs with React & Vite',
    category: 'frontend',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1000&auto=format&fit=crop&q=80',
    content: `# Modern Frontend Development: Building Reactive SPAs with React & Vite

Frontend web development in 2026 demands rapid build times, instantaneous Hot Module Replacement (HMR), and lean production bundles. Vite paired with React delivers just that.

---

## 1. Why Choose Vite over Legacy Bundlers?

Historically, Webpack served as the backbone of single-page applications. However, as applications scaled to hundreds of modules, cold-start times increased significantly.

* **Lightning-fast Dev Server:** Leveraging native ES modules in the browser.
* **Instant HMR:** Only the modified component reloads without resetting application state.
* **Optimized Rollup Production Builds:** Tree-shaking and minification out of the box.

### Quick Example: Custom Hook for API Data

\`\`\`javascript
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [url]);

  return { data, loading, error };
}
\`\`\`

> **Key Takeaway:** Clean architecture and separation of concerns allow SPAs to scale gracefully as your engineering team grows.
`,
  },
  {
    title: 'Architecting Scalable REST APIs with Node.js, Express & Clean Layering',
    category: 'backend',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80',
    content: `# Architecting Scalable REST APIs with Node.js & Express

Building a production-ready backend is not merely about stitching routes together. It requires clean layering, defensive programming, and centralized error handling.

---

## Core Architecture Layers

1. **Routing Layer:** Defines HTTP methods and endpoints.
2. **Controller Layer:** Parses incoming request payloads and orchestrates responses.
3. **Service Layer:** Houses pure business logic, validations, and third-party integrations.
4. **Data Access Layer:** Interfaces directly with MongoDB via Mongoose models.

### Centralized Async Error Wrapper

\`\`\`javascript
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
\`\`\`

### Global Error Handling Middleware

\`\`\`javascript
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});
\`\`\`

> **Best Practice:** Never return raw database errors to API consumers in production to prevent sensitive schema leakage.
`,
  },
  {
    title: 'Mastering MongoDB Atlas: Indexing, Sharding & Aggregation Pipelines',
    category: 'database',
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1000&auto=format&fit=crop&q=80',
    content: `# Mastering MongoDB Atlas: Indexing & Performance Optimization

NoSQL databases offer flexibility, but without proper indexing and schema discipline, queries quickly degrade into expensive collection scans (\`COLLSCAN\`).

---

## 1. Single Field vs Compound Indexes

Creating an index tailored to your query patterns reduces query execution time from hundreds of milliseconds to under 2ms.

\`\`\`javascript
// Compound index for queries filtering by category and sorting by creation date
postSchema.index({ category: 1, createdAt: -1 });
\`\`\`

## 2. Advanced Aggregation Pipelines

Aggregation pipelines process documents through multi-stage transformations:

\`\`\`javascript
const stats = await Post.aggregate([
  { $match: { category: { $ne: 'other' } } },
  {
    $group: {
      _id: '$category',
      totalPosts: { $sum: 1 },
      lastUpdated: { $max: '$updatedAt' },
    },
  },
  { $sort: { totalPosts: -1 } },
]);
\`\`\`

* **Match early:** Filter out irrelevant documents as the first pipeline stage.
* **Project judiciously:** Only pass required fields to downstream stages.
`,
  },
  {
    title: 'CI/CD Pipelines & Containerization with Docker & GitHub Actions',
    category: 'devops',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1000&auto=format&fit=crop&q=80',
    content: `# CI/CD Pipelines & Containerization with Docker & GitHub Actions

Modern engineering organizations automate testing, security vulnerability scans, and deployments with robust CI/CD pipelines.

---

## Multi-Stage Dockerfile for Node.js

Multi-stage builds keep production image sizes tiny by discarding build tools and dev dependencies.

\`\`\`dockerfile
# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
USER node
EXPOSE 5000
CMD ["node", "dist/index.js"]
\`\`\`

## GitHub Actions Workflow (.github/workflows/deploy.yml)

\`\`\`yaml
name: Deploy Pipeline
on:
  push:
    branches: [main]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
      - name: Trigger Production Deployment
        run: echo "Deploying artifact to production server..."
\`\`\`
`,
  },
  {
    title: 'The Fullstack Engineer Roadmap: Navigating Architecture & Scalability',
    category: 'fullstack',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop&q=80',
    content: `# The Fullstack Engineer Roadmap: Navigating Architecture & Scalability

Being a fullstack engineer means understanding how frontend UX decisions influence backend API latency, and how database indexing impacts UI responsiveness.

---

## Key Pillars for Fullstack Excellence

1. **End-to-End Type Safety:** Sharing TypeScript models and DTOs between client and server.
2. **State Management:** Decoupling server state (e.g., TanStack Query) from local UI state.
3. **Resilient Authentication:** JWT access tokens coupled with secure HttpOnly refresh cookies.
4. **Performance Monitoring:** Implementing OpenTelemetry and structured logging.

> **Continuous Growth:** The best engineers focus on fundamental design principles—clean code, testability, and clear documentation—which outlive any specific framework.
`,
  },
  {
    title: 'Deep Dive into TypeScript: Advanced Generics, Conditional Types & Mappings',
    category: 'frontend',
    imageUrl: 'https://images.unsplash.com/photo-1516116211227-bbc0429f57fa?w=1000&auto=format&fit=crop&q=80',
    content: `# Deep Dive into TypeScript: Advanced Generics & Type Gymnastics

TypeScript has evolved from simple type annotations into an expressive type system capable of modeling complex runtime behavior statically.

---

## 1. Generic Constraints & Default Parameters

Generics allow us to write reusable, flexible code while preserving precise type information.

\`\`\`typescript
interface Entity {
  id: string | number;
}

function updateEntity<T extends Entity>(collection: T[], id: T['id'], updates: Partial<T>): T[] {
  return collection.map(item => item.id === id ? { ...item, ...updates } : item);
}
\`\`\`

## 2. Conditional Types & the \`infer\` Keyword

Conditional types allow us to compute types dynamically based on boolean type conditions:

\`\`\`typescript
type Flatten<T> = T extends Array<infer Item> ? Item : T;

type StrArray = Flatten<string[]>; // string
type SingleNum = Flatten<number>;   // number
\`\`\`

## 3. Template Literal Types for Type-Safe Events

\`\`\`typescript
type EventName = 'click' | 'focus' | 'blur';
type EventHandler = \`on\${Capitalize<EventName>}\`; // "onClick" | "onFocus" | "onBlur"
\`\`\`

> **Pro Tip:** Avoid over-engineering types when simple interfaces suffice. Readable code with solid runtime tests is always better than esoteric type puzzles.
`,
  },
  {
    title: 'Designing Event-Driven Microservices with Redis, RabbitMQ & Node.js',
    category: 'backend',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&auto=format&fit=crop&q=80',
    content: `# Designing Event-Driven Microservices: Asynchronous Messaging at Scale

Monolithic architectures eventually reach boundaries where horizontal scaling becomes inefficient. Event-driven architectures decouple services and provide elasticity.

---

## 1. Synchronous HTTP vs Asynchronous Messaging

| Dimension | Synchronous (HTTP / REST) | Asynchronous (Message Broker) |
| :--- | :--- | :--- |
| **Coupling** | High (Caller must wait) | Loose (Fire and forget) |
| **Resilience** | Cascade failures possible | Buffers spikes with queues |
| **Latency** | Immediate round-trip | Sub-millisecond queue ingest |

## 2. Implementing a Redis Pub/Sub Event Producer

\`\`\`javascript
import { createClient } from 'redis';

const publisher = createClient({ url: process.env.REDIS_URL });
await publisher.connect();

export async function publishEvent(channel, payload) {
  const event = {
    eventId: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    data: payload,
  };
  await publisher.publish(channel, JSON.stringify(event));
  console.log(\`[Event Published] Channel: \${channel}\`);
}
\`\`\`

## 3. Ensuring Idempotency

Network retries can result in duplicate events. Always maintain an \`idempotencyKey\` or check a distributed lock in Redis before executing side effects.
`,
  },
  {
    title: 'SQL vs NoSQL in 2026: Trade-offs, ACID Guarantees & Polyglot Persistence',
    category: 'database',
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1000&auto=format&fit=crop&q=80',
    content: `# SQL vs NoSQL: Making the Right Architectural Choice

Choosing between a relational database (like PostgreSQL) and a document store (like MongoDB) is not about popularity—it is about your data access patterns and integrity requirements.

---

## When to Choose PostgreSQL (SQL)

* **Complex Multi-Table Joins:** Deeply normalized relations with strict foreign keys.
* **ACID Transactions by Default:** Financial records, ledgers, and inventory checkout locks.
* **Robust JSONB Support:** Postgres allows indexing JSON documents natively with GIN indexes.

## When to Choose MongoDB (Document NoSQL)

* **Document-Centric Access Patterns:** Articles with embedded comments, product catalogs with varying attributes.
* **Rapid Iteration:** Schema evolution without complex migration locks.
* **Horizontal Scaling:** Built-in automatic sharding across geographical regions.

\`\`\`javascript
// Example: Atomic updates on sub-documents in MongoDB
await Post.updateOne(
  { _id: postId },
  { 
    $push: { comments: { text: 'Great article!', author: userId, createdAt: new Date() } },
    $inc: { viewsCount: 1 }
  }
);
\`\`\`

> **Summary:** Many modern companies use **Polyglot Persistence**: PostgreSQL for billing and authentication, and MongoDB or Redis for content feeds and session caching.
`,
  },
  {
    title: 'Kubernetes in Practice: Deploying, Scaling & Monitoring Cloud-Native Apps',
    category: 'devops',
    imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1000&auto=format&fit=crop&q=80',
    content: `# Kubernetes in Practice: Production Orchestration Fundamentals

Kubernetes (K8s) automates the deployment, scaling, and operational management of containerized applications across compute clusters.

---

## 1. Anatomy of a Kubernetes Deployment

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frenzy-blog-api
  labels:
    app: blog-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: blog-backend
  template:
    metadata:
      labels:
        app: blog-backend
    spec:
      containers:
      - name: api
        image: frenzy/blog-backend:v1.2.0
        ports:
        - containerPort: 5001
        envFrom:
        - secretRef:
            name: blog-secrets
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "100m"
            memory: "128Mi"
        livenessProbe:
          httpGet:
            path: /api/posts
            port: 5001
          initialDelaySeconds: 15
          periodSeconds: 20
\`\`\`

## 2. Key Best Practices

1. **Always Define Resource Requests & Limits:** Avoid the "noisy neighbor" problem where one pod consumes the node's entire RAM.
2. **Implement Graceful Shutdown:** Listen for \`SIGTERM\` in Node.js and close active database connections before terminating.
3. **Use Ingress Controllers with Automatic SSL:** Cert-Manager automates Let's Encrypt certificates renewal without manual intervention.
`,
  },
  {
    title: 'Web Application Security: Defending Against XSS, CSRF, NoSQL Injection & Broken Auth',
    category: 'fullstack',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1000&auto=format&fit=crop&q=80',
    content: `# Web Application Security: Defending Against Modern Attack Vectors

Security should never be an afterthought. Developers must write defensive code at every layer of the tech stack to safeguard customer data.

---

## 1. Cross-Site Scripting (XSS) Prevention

XSS occurs when malicious scripts are injected into trusted websites.

* **Never use raw \`eval()\` or unsanitized innerHTML:** Always sanitize user inputs or use modern libraries like DOMPurify.
* **Content Security Policy (CSP):** Restrict where scripts, styles, and images can be fetched from.

## 2. NoSQL Injection Defense

Attacking MongoDB via malicious operators:

\`\`\`javascript
// VULNERABLE:
const user = await User.findOne({ username: req.body.username, password: req.body.password });
// If attacker sends { "username": "admin", "password": { "$ne": null } }, they bypass login!

// SECURE: Enforce string types with validation
if (typeof req.body.password !== 'string' || typeof req.body.email !== 'string') {
  return res.status(400).json({ message: 'Invalid credentials format' });
}
\`\`\`

## 3. Essential Security Middleware Stack

\`\`\`javascript
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Set secure HTTP headers
app.use(helmet());

// Protect against brute-force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 failed login attempts per IP
  message: 'Too many login attempts, please try again later.',
});

app.use('/api/users/login', authLimiter);
\`\`\`

> **Conclusion:** Security is a continuous discipline. Keep dependencies updated using \`npm audit\`, enable MFA, and follow the principle of least privilege.
`,
  },
];
