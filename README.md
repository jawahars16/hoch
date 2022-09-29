# UP

UP is a simple utility to do uptime check on the given endpoint. While doing some upgrades to your servers or running some deployment pipelines, you might want to check if the endpoint is up and running. UP is a simple utility to do that. It continue to poll the endpoint and a simple asterisk would be shown for every response. The color code of asterisk would help you differentiate the response. At the end of run, it would show the summary of the response.

## Installation

```npm install -g up```

## Usage

```up http://localhost:3000```

## Options

### interval

Configure the interval between each poll. Default is 1 second.

```-i, --interval <interval>```

### method

Configure the method to use for the request. Default is GET.

```-X, --method <method>```

### version

Show the version of the utility.

```--version```

## License

`up` is made available under the terms of either the MIT License or the Apache License 2.0, at your option.