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
        return S(self.a * x + self.b)

    def loss(self, x, y):
        return (y - self.prediction(x)) ** 2

    def backpropagation(self, factor, x):
        next_factor = factor * dSdY(self.a * x + self.b)
        grad = next_factor * x
        next_factor *= self.a

        self.a -= alpha * grad
        self.b -= alpha * next_factor

        return next_factor


output = Neuron()
layer = Neuron()

predicted = output.prediction(layer.prediction(5))

actual = y

factor = output.backpropagation(-2 * (actual - predicted))
factor = layer.backpropagation(factor)

