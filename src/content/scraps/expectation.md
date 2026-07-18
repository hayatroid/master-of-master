---
title: 期待値
tags: [応用数理]
---

## 定義

[[random-variable|確率変数]] $X$ の期待値とは，$X$ の値をその確率で重み付けした平均であり，

$$
\mathbb{E}[X] = \int_\Omega X \, d\mathbb{P}
$$

と定義される．とくに，$X$ が可算集合 $A$ 上の値をとるときは，

$$
\mathbb{E}[X] = \sum_{x \in A} x \mathbb{P}(X = x)
$$

である．

## 性質

$a, b \in \mathbb{R}$ と期待値が存在する確率変数 $X, Y$ に対して，

$$
\mathbb{E}[aX + bY] = a\mathbb{E}[X] + b\mathbb{E}[Y]
$$

が成り立つ（期待値の線形性）．

また、$X, Y$ が[[independence|独立]]であれば、$XY$ の期待値は次のように表される。

$$
\mathbb{E}[XY] = \mathbb{E}[X]\mathbb{E}[Y].
$$
