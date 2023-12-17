import React, { Component } from 'react'
import Terminal from 'react-console-emulator'

const commands = {
    echo: {
        description: 'Echo a passed string.',
        usage: 'echo <string>',
        fn: (...args) => args.join(' ')
    }
}

export default class MyTerminal extends Component {
    render() {
        return (
            <Terminal
                commands={commands}
                welcomeMessage={''}
                style={{ backgroundColor: "#0c0d0e" }}
                promptLabel={'user@Sera:~$'}
            />
        )
    }
}