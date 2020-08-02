import numpy

data: numpy.ndarray


def grad_rss_a(a: float, b: float) -> Tuple[float, float]:
    y_i = data[:, 1]
    x_i = data[:, 0]
    # Implement this.
