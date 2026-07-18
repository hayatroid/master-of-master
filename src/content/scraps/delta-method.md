---
title: デルタ法
tags: [応用数理]
---

## 定理

確率変数列 $Y_1, Y_2, \ldots$ が

$$
\sqrt{n}(Y_n - \mu) \xrightarrow{d} N(0, \sigma^2)
$$

を満たし，関数 $h$ が $\mu$ の近傍で連続微分可能であるとする．このとき，

$$
\sqrt{n}\bigl(h(Y_n) - h(\mu)\bigr)
\xrightarrow{d} N\bigl(0, (h'(\mu))^2\sigma^2\bigr)
$$

が成り立つ．これをデルタ法という．

## 考え方

[[mean-value-theorem|平均値の定理]]により，$Y_n$ と $\mu$ の間にある $Z_n$ を用いて

$$
h(Y_n) - h(\mu) = h'(Z_n)(Y_n - \mu)
$$

と書ける．$Z_n$ が $\mu$ に近づけば $h'(Z_n)$ は $h'(\mu)$ に近づくため，$Y_n$ の漸近分布から $h(Y_n)$ の漸近分布を導ける．デルタ法は，推定量を変換したときの[[convergence-in-distribution|分布収束]]を求める際に用いられる．
