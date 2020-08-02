import math

from typing import List


def S(y: float) -> float:
    return 1 / (1 + math.exp(-y))


class Perceptron:
    def __init__(self, a=0, b=0, alpha=0.05):
        self.a = a
        self.b = b
        self.alpha = alpha

    def prediction(self, x: float) -> float:
        return S(self.a * x + self.b)

    def loss(self, x: List[float], y: List[float]) -> float:
        return sum((yi - self.prediction(xi)) ** 2 for xi, yi in zip(x, y))

    def backpropagation(self, x: List[float], y: List[float]):
        pass  # Implement this.

