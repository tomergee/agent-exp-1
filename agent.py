#!/usr/bin/env python3
"""
Simple CLI Agent - Experiment 1
A basic command-line agent with extensible command handling.
"""

import sys
import re
from typing import Dict, Callable, List


class Agent:
    """A simple CLI agent that processes commands."""

    def __init__(self):
        self.commands: Dict[str, Callable] = {
            'help': self.help_command,
            'echo': self.echo_command,
            'calculate': self.calculate_command,
            'reverse': self.reverse_command,
            'quit': self.quit_command,
            'exit': self.quit_command,
        }
        self.running = True

    def help_command(self, args: List[str]) -> str:
        """Display available commands."""
        help_text = [
            "\nAvailable Commands:",
            "  help              - Show this help message",
            "  echo <text>       - Echo back the provided text",
            "  calculate <expr>  - Evaluate a mathematical expression",
            "  reverse <text>    - Reverse the provided text",
            "  quit/exit         - Exit the agent",
        ]
        return "\n".join(help_text)

    def echo_command(self, args: List[str]) -> str:
        """Echo back the user's input."""
        if not args:
            return "Error: No text provided to echo"
        return " ".join(args)

    def calculate_command(self, args: List[str]) -> str:
        """Evaluate a mathematical expression."""
        if not args:
            return "Error: No expression provided"

        expression = " ".join(args)
        # Remove any potentially dangerous operations
        if any(char in expression for char in ['_', '[', ']', '{', '}', ';', 'import', 'exec', 'eval']):
            return "Error: Invalid characters in expression"

        # Only allow numbers, operators, and parentheses
        if not re.match(r'^[\d\s\+\-\*\/\(\)\.\%]+$', expression):
            return "Error: Expression contains invalid characters"

        try:
            result = eval(expression, {"__builtins__": {}}, {})
            return f"Result: {result}"
        except Exception as e:
            return f"Error: Could not evaluate expression - {str(e)}"

    def reverse_command(self, args: List[str]) -> str:
        """Reverse the provided text."""
        if not args:
            return "Error: No text provided to reverse"
        text = " ".join(args)
        return text[::-1]

    def quit_command(self, args: List[str]) -> str:
        """Quit the agent."""
        self.running = False
        return "Goodbye!"

    def process_command(self, user_input: str) -> str:
        """Process a user command and return the result."""
        if not user_input.strip():
            return ""

        parts = user_input.strip().split()
        command = parts[0].lower()
        args = parts[1:] if len(parts) > 1 else []

        if command in self.commands:
            return self.commands[command](args)
        else:
            return f"Unknown command: '{command}'. Type 'help' for available commands."

    def run(self):
        """Main agent loop."""
        print("=" * 50)
        print("Simple CLI Agent - Experiment 1")
        print("=" * 50)
        print("Type 'help' for available commands")
        print()

        while self.running:
            try:
                user_input = input("agent> ").strip()
                if user_input:
                    response = self.process_command(user_input)
                    if response:
                        print(response)
                        print()
            except KeyboardInterrupt:
                print("\n\nInterrupted. Use 'quit' to exit cleanly.")
                print()
            except EOFError:
                print("\nGoodbye!")
                break


def main():
    """Entry point for the agent."""
    agent = Agent()
    agent.run()


if __name__ == "__main__":
    main()
