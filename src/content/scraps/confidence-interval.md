---
title: 信頼区間
tags: [応用数理]
---

## 定義

未知母数の母数空間を $\Theta$ とする．標本から定まる二つの統計量 $L_n, U_n$ が，任意の $\theta \in \Theta$ に対して

$$
\mathbb{P}_\theta(\theta \in [L_n, U_n]) = 1 - \alpha
$$

を満たすとき，ランダムな閉区間 $[L_n, U_n]$ を信頼係数 $1 - \alpha$ の信頼区間という．頻度論では，母数 $\theta$ が確率的に変動するのではなく，標本を取り直すたびに変わる区間が一定の割合で真の母数を含むと解釈する．

## 漸近的信頼区間

標本サイズ $n$ に依存する区間 $[L_n, U_n]$ が，任意の $\theta \in \Theta$ に対して

$$
\lim_{n \to \infty}
\mathbb{P}_\theta(\theta \in [L_n, U_n])
= 1 - \alpha
$$

を満たすとき，これを漸近的な信頼係数 $1 - \alpha$ の信頼区間という．
