{
  "version": 2,
  "builds": [
    {
      "src": "backend/index.js",
      "use": "@vercel/node",
      "config": {
        "includeFiles": ["frontend/**"]
      }
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/backend/index.js"
    }
  ]
}
