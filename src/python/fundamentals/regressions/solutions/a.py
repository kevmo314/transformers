from typing import List, Tuple


def rss(data: numpy.ndarray, a: float, b: float) -> float:
    x_i = data[:, 0]
    y_i = data[:, 1]
    return numpy.sum((y_i - (a * x_i + b)) ** 2)
