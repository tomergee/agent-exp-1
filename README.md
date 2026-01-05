# agent-exp-1

A simple CLI agent experiment with extensible command handling.

## Features

- **Interactive Command Line Interface**: Chat with the agent using simple commands
- **Built-in Commands**:
  - `help` - Display available commands
  - `echo <text>` - Echo back text
  - `calculate <expression>` - Evaluate mathematical expressions
  - `reverse <text>` - Reverse text
  - `quit/exit` - Exit the agent
- **Extensible Architecture**: Easy to add new commands

## Installation

No external dependencies required! Just Python 3.6+

```bash
# Make the script executable
chmod +x agent.py
```

## Usage

Run the agent:

```bash
python3 agent.py
```

### Example Session

```
==================================================
Simple CLI Agent - Experiment 1
==================================================
Type 'help' for available commands

agent> help

Available Commands:
  help              - Show this help message
  echo <text>       - Echo back the provided text
  calculate <expr>  - Evaluate a mathematical expression
  reverse <text>    - Reverse the provided text
  quit/exit         - Exit the agent

agent> echo Hello, World!
Hello, World!

agent> calculate 2 + 2 * 3
Result: 8

agent> reverse Python is awesome
emosewa si nohtyP

agent> quit
Goodbye!
```

## Adding New Commands

To add a new command, simply:

1. Define a new method in the `Agent` class with signature: `def your_command(self, args: List[str]) -> str`
2. Register it in the `__init__` method's `self.commands` dictionary
3. Update the help text

Example:

```python
def uppercase_command(self, args: List[str]) -> str:
    """Convert text to uppercase."""
    if not args:
        return "Error: No text provided"
    return " ".join(args).upper()

# In __init__:
self.commands['uppercase'] = self.uppercase_command
```

## Future Enhancements

Potential features to add:
- Command history
- File operations (read/write)
- External API integration
- Plugin system
- Configuration file support
- Logging functionality

## License

MIT