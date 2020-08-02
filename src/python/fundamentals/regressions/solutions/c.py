def linear_regression(data: List[Tuple[float, float]]) -> Tuple[float, float]:
    return gradient_descent_2d(
        grad_x=lambda a, b: grad_rss_a(data, a, b),
        grad_y=lambda a, b: grad_rss_b(data, a, b),
        alpha=0.1,
        a=0,
        b=0,
    )
