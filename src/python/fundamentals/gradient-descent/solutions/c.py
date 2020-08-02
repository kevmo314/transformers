from typing import Callable, Tuple


def gradient_descent_2d(
    grad_x: Callable[[float, float], float],
    grad_y: Callable[[float, float], float],
    alpha: float,
    x: float,
    y: float,
) -> Tuple[float, float]:
    delta_x = 1
    delta_y = 1
    while abs(delta_x) >= 0.0001 or abs(delta_y) >= 0.0001:
        delta_x = alpha * grad_x(x, y)
        delta_y = alpha * grad_y(x, y)
        x -= delta_x
        y -= delta_y
    return x, y

