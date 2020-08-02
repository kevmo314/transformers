import math


def S(y: float) -> float:
    return 1 / (1 + math.exp(-y))


def dSdY(y: float) -> float:
    return S(y) * (1 - S(y))


class Perceptron:
    def __init__(self, a=0, b=0, alpha=0.05):
        self.a = a
        self.b = b
        self.alpha = alpha

    def prediction(self, x):
        return self.a * x + self.b

    def loss(self, x, y):
        return (y - self.prediction(x)) ** 2

    def backpropagation(self, x: List[float], y: List[float], factor: float):
        # TODO: Update this algorithm to
        Sy = self.prediction(x)
        dSdy = Sy * (1 - Sy)

        # Compute the gradient.
        dRSSda = -2 * sum((yi - Sy) * dSdy * xi for xi, yi in zip(x, y))
        dRSSdb = -2 * sum((yi - Sy) * dSdy for xi, yi in zip(x, y))

        # Update the parameters.
        self.a -= self.alpha * dRSSda
        self.b -= self.alpha * dRSSdb
