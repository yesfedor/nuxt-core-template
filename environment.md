# Configuring Deployment

---

### Required:

1. VPS / VDS with docker and SSL
2. Created branches: dev, stage, main

You will also need the following repository settings to use the secrets:

`SERVER_HOST`: The address of the server where Docker is installed.
`SERVER_USERNAME`: The username for the SSH connection.
`SSH_PRIVATE_KEY`: The SSH private key to connect to the server.
Replace `<nuxt-core-template_>` with the actual name of the container in the appropriate lines.

When a pull request is created to one of the specified branches (`dev`, `stage`, or `main`), Workflow will be started with the set value of the `stage` environment variable corresponding to the current branch. It will also use the appropriate port depending on the mode.

Make sure that Docker is installed on the server and the container image is available. Also, don't forget to add secrets on your GitHub repository settings page to specify values for `SERVER_HOST`, `SERVER_USERNAME` and `SSH_PRIVATE_KEY`.

---

### Important!

When changing `ports`, do not forget to change the values in ./environments/`stage`.env
