from typing import Callable, Tuple


def gradient_descent_2d(
    grad_x: Callable[[float, float], float],  # grad_x(x, y) = ∂f(x, y)/∂x
    grad_y: Callable[[float, float], float],  # grad_y(x, y) = ∂f(x, y)/∂y
    alpha: float,
    x: float,
    y: float,
) -> Tuple[float, float]:
    pass  # Implement this.
