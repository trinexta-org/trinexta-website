# Architecture du projet

## Vue d'ensemble

Le site est composé de trois parties qui travaillent ensemble.

```mermaid
flowchart TD
    A([Navigateur]) --> B

    subgraph VPS["Serveur VPS (OVH)"]
        B["Next.js\nport 3010 en staging"]
        D[("PostgreSQL\nformulaires de contact")]
        E["PM2\ngestion du process"]
        E --> B
        B --> D
    end

    subgraph Cloud["Sanity Cloud"]
        C["Sanity API\ncontenu du site"]
        F["Sanity Studio\nport 3333"]
        F -->|publie| C
    end

    B -->|requetes GROQ| C
    G(["Redacteur"]) --> F

    style VPS fill:#dce8f5,color:#0a233e,stroke:#0a233e,stroke-width:2px
    style Cloud fill:#eaf1f8,color:#0a233e,stroke:#5c92b8,stroke-width:2px
    style A fill:#f0f4f8,color:#0a233e,stroke:#0a233e
    style G fill:#f0f4f8,color:#0a233e,stroke:#0a233e
    style B fill:#0a233e,color:#fff,stroke:none
    style C fill:#0a233e,color:#fff,stroke:none
    style D fill:#5c92b8,color:#fff,stroke:none
    style E fill:#5c92b8,color:#fff,stroke:none
    style F fill:#5c92b8,color:#fff,stroke:none
