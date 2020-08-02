# Gradient descent
# 1. Pick a starting point x.
# 2. Calculate the gradient at x.
# 3. Move to a new x = x - alpha * gradient.
# 4. If the difference with the previous x < 0.0001, return. Otherwise, repeat with new x.

from typing import Callable


def gradient_descent_1d(
    grad: Callable[[float], float], alpha: float, x: float
) -> float:
    pass  # Implement this.
