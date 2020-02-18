
### Generate user NPM rc configuration file from a template

The purpose of this little library is to quickly bootstrap access to private and scoped NPM registries that require a token.

#### Usage

Add .npmrc to your project directory and specify the scope and registry URL
```
@myscope:registry=https://my-private-npm-registry

always-auth=false
```

Add a users rc file template to your project (this will be specific to your registry provider)
```
; begin auth token
//pkgs.dev.azure.com/devazure/npm-repo/_packaging/az-feed/npm/registry/:username=devazure
//pkgs.dev.azure.com/devazure/npm-repo/_packaging/az-feed/npm/registry/:_password=TOKEN_PLACEHOLDER
//pkgs.dev.azure.com/devazure/npm-repo/_packaging/az-feed/npm/registry/:email=npm requires email to be set but doesn't use the value
//pkgs.dev.azure.com/devazure/npm-repo/_packaging/az-feed/npm/:username=devazure
//pkgs.dev.azure.com/devazure/npm-repo/_packaging/az-feed/npm/:_password=TOKEN_PLACEHOLDER
//pkgs.dev.azure.com/devazure/npm-repo/_packaging/az-feed/npm/:email=npm requires email to be set but doesn't use the value
; end auth token
```

Add this package to your project (at this moment it's recommended to lock to a specific version as this library is still in alpha!)
```
npm i setup-npmrc-token --save-dev
```

Add NPM script to make things easier for your team
```
  "scripts": {
    "setup-npm-registry": "node node_modules/setup-npmrc-token/dist/index.js --template=tasks/repo/rc-template"
  },
```


