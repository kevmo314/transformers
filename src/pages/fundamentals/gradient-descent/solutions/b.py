from typing import Callable


def gradient_descent_1d(
    grad: Callable[[float], float], alpha: float, x: float
) -> float:
    delta = 1
    while abs(delta) >= 0.0001:
        delta = alpha * grad(x)
        x -= delta
    return x
