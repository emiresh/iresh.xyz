---
title: "Mutating vs Validating Webhooks in Kubernetes"
description: "Understanding admission controllers in Kubernetes - the policy enforcement gates that validate and modify resources before they reach your cluster."
pubDatetime: 2026-02-18T00:00:00+01:00
tags: ["kubernetes", "security", "devops", "cloudnative"]
draft: false
---

![Admission Controller Phases](/assets/img/2026/mutating-vs-validating-webhooks-kubernetes/admission-phases.png)

Kubernetes is powerful - but with great power comes great "who deployed this to prod?"

That's where Admission Controllers come in.

They act like policy enforcement gates inside the Kubernetes API server. Before anything gets stored in the cluster, admission controllers can validate it, modify it, or completely reject it.

Let's break it down properly.

## What Are Admission Controllers?

An Admission Controller is code that intercepts requests to the Kubernetes API server after authentication and authorization, but before the object is persisted in etcd.

In simpler terms:

They're middleware for the Kubernetes API.

If you run:

```bash
kubectl apply -f deployment.yaml
```

The request flow looks like this:

```
Request → Authentication → Authorization → Mutating Admission → Schema Validation → Validating Admission → etcd
```

Admission controllers sit right in the middle of this pipeline.

## Two Main Types of Admission Controllers

### Mutating Admission Controllers

These can modify incoming requests before they are stored.

Common examples:

- Adding default labels
- Injecting sidecar containers (for example with Istio)
- Adding default resource limits
- Overriding missing fields

Mutating controllers run first.

They take your original object and are allowed to change it.

### Validating Admission Controllers

These cannot modify the request.

They only decide:

- Allow ✅
- Reject ❌

Examples:

- Blocking privileged containers
- Enforcing image registry policies
- Validating required labels
- Enforcing naming standards

Validating controllers run after mutation, meaning they see the final version of the object.

That ordering is important.

## Static vs Dynamic Admission Controllers

Admission controllers come in two forms.

### Static (Built-in)

These ship with Kubernetes and are enabled via the API server flag:

```bash
--enable-admission-plugins
```

Common examples:

- NamespaceLifecycle
- LimitRanger
- ResourceQuota
- ServiceAccount

For example, NamespaceLifecycle prevents you from creating new resources in a namespace that is being terminated.

Many features people assume are "core Kubernetes behavior" are actually implemented using these built-in admission controllers.

### Dynamic (Webhook-Based)

These are far more flexible.

They include:

- MutatingAdmissionWebhook
- ValidatingAdmissionWebhook

Instead of embedding logic directly in the API server, Kubernetes calls an external HTTPS service (a webhook) and asks:

- "Is this request okay?"
- "Do you want to change anything?"

This means you can implement custom logic in:

- Go
- Python
- Node
- Any language capable of serving HTTPS

This is where things get powerful.

## Why Admission Controllers Matter

In real-world clusters, most use cases fall into two categories: security and governance.

### Security

Admission controllers can enforce a security baseline across your cluster.

Examples:

- Block containers running as root
- Allow images only from trusted registries
- Enforce read-only root filesystems
- Prevent hostPath usage

For example, you can reject any deployment that includes:

```yaml
securityContext:
  privileged: true
```

That alone can prevent some serious security risks.

### Governance & Compliance

They also help enforce organizational standards:

- Naming conventions
- Required labels
- Resource limits
- Replica restrictions

For example, you can enforce that every deployment must include:

```yaml
labels:
  environment: production
```

No label? No deploy.

Simple. Effective.

## Real-World Example: Ingress Controllers

When installing an ingress controller like F5 NGINX Ingress Controller, you'll notice it creates:

- MutatingWebhookConfiguration
- ValidatingWebhookConfiguration

Why?

Because Kubernetes doesn't understand NGINX-specific configuration logic.

The webhook:

- Validates ingress annotations
- Prevents invalid configurations
- Stops broken NGINX reloads
- Protects production traffic

Without this layer, a bad Ingress definition could generate an invalid NGINX config and impact live traffic.

That webhook is your safety net.

## How Mutating and Validating Work Together

Let's say you create a Deployment like this:

```yaml
replicas: 1
```

Here's what might happen:

1. A mutating webhook changes replicas to 3
2. A validating webhook checks that replicas are not greater than 5
3. If valid → the object is stored in etcd

This layered approach ensures:

- Defaults are applied
- Policies are enforced
- Broken configurations never reach the cluster state

## Enabling Admission Controllers

On the API server, you enable them using:

```bash
--enable-admission-plugins=MutatingAdmissionWebhook,ValidatingAdmissionWebhook
```

To verify webhook support:

```bash
kubectl api-versions | grep admissionregistration.k8s.io
```

If you see:

```
admissionregistration.k8s.io/v1
```

You're good to go.

## Writing Your Own Admission Controller

If you want to build one yourself, here's the high-level flow:

1. Build an HTTPS service
2. Accept AdmissionReview objects
3. Return:
   - allowed: true/false
   - Optional JSON patch (for mutation)

4. Register it using:
   - MutatingWebhookConfiguration
   - or ValidatingWebhookConfiguration

Your webhook must:

- Use TLS
- Be reachable inside the cluster
- Include a CA bundle in its configuration

Once configured, Kubernetes will call your service every time matching resources are created, updated, or deleted.

## Final Thoughts

Admission Controllers are one of the most powerful - and often overlooked - features in Kubernetes.

They give you a programmable control layer inside the API server.

If you're running Kubernetes in production and not leveraging admission controllers, you're relying entirely on developers to "do the right thing."

And we all know how that usually goes.

Use them wisely - and your cluster becomes significantly safer and more predictable.
