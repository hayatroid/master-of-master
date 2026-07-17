---
title: マルコフの不等式
tags: [数学]
---

## 定理

マルコフの不等式とは，非負の[[random-variable|確率変数]] $X$ と任意の $c > 0$ に対して，

$$
\mathbb{P}(X \geq c) \leq \frac{\mathbb{E}[X]}{c}
$$

が成り立つことを主張する不等式である．

## 証明

$X$ は非負であるから，各根元事象に対して $X \geq c\mathbf{1}_{\{X \geq c\}}$ である．したがって，

$$
\mathbb{E}[X]
\geq \mathbb{E}\left[c\mathbf{1}_{\{X \geq c\}}\right]
= c\mathbb{P}(X \geq c)
$$

となり，両辺を $c$ で割れば得られる．

## 応用

チェビシェフの不等式は，マルコフの不等式を用いて導出できる．

$$
\mathbb{P}(|X - \mathbb{E}[X]| \geq c) = \mathbb{P}((X - \mathbb{E}[X])^2 \geq c^2) \leq \frac{\mathbb{E}[(X - \mathbb{E}[X])^2]}{c^2} = \frac{\mathrm{Var}(X)}{c^2}.
$$
