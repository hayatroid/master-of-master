---
title: 独立
tags: [応用数理]
---

## 定義

[[random-variable|確率変数]] $X_1, X_2, \ldots, X_n$ が互いに独立であるとは，任意のボレル集合 $A_1, A_2, \ldots, A_n \subset \mathbb{R}$ に対して，

$$
\mathbb{P}\left(\bigcap_{i=1}^n \{X_i \in A_i\}\right)
= \prod_{i=1}^n \mathbb{P}(X_i \in A_i)
$$

が成り立つことである．

## 性質

$X_1, X_2, \ldots, X_n$ が互いに独立で，可測関数 $f_1, f_2, \ldots, f_n$ がそれぞれ $\mathbb{E}[|f_i(X_i)|] < \infty$ を満たすとき，

$$
\mathbb{E}\left[\prod_{i=1}^n f_i(X_i)\right]
= \prod_{i=1}^n \mathbb{E}[f_i(X_i)]
$$

が成り立つ．
