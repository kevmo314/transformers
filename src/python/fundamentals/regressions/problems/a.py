import numpy

data: List[Tuple[float, float]],

def rss(a: float, b: float) -> float:
    # data is of form [[x1, y1], [x2, y2], ..., [xn, yn]]
    x_i = data[:, 0]
    y_i = data[:, 1]
    # Implement this.
