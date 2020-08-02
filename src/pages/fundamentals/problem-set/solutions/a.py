import numpy


def gradient_descent(
    grad: Callable[numpy.ndarray, numpy.ndarray], alpha: float, x: numpy.ndarray
) -> numpy.ndarray:
    delta = numpy.ones_like(x)
    while numpy.linalg.norm(delta) >= 0.0001:
        delta = alpha * grad(x)
        x -= delta
    return x
