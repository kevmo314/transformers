import numpy


def grad_rss(a: float, b: float) -> float:
    epsilon_i = y_i - (a * x_i + b)

    partial_a = -2 * numpy.sum(x_i * epsilon_i)
    partial_b = -2 * numpy.sum(epsilon_i)

    return (partial_a, partial_b)

