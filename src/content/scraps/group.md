---
title: 群
tags: [数学]
---

## 定義

群とは，次の $3$ つの公理を満たす $3$ つ組 $(G, \cdot, e)$ のことである．ここで $G$ は集合，$\cdot: G \times G \to G$ は写像，$e \in G$ は元である．

1. $\forall a \in G, \forall b \in G, \forall c \in G, (ab)c = a(bc).$
2. $\forall a \in G, ea = a = ae.$
3. $\forall a \in G, \exists b \in G, ab = e = ba.$

> [!NOTE]
> 群 $(G, \cdot, e)$ が次を満たすとき，可換群という．
>
> 4. $\forall a \in G, \forall b \in G, ab = ba.$

> [!NOTE]
> 群 $(G, \cdot, e)$ が有限個の元からなるとき，有限群という．

## 例

- $(\mathbb{Z}, +, 0)$ は群である．
- $(\mathbb{F}_{998244353}^\times, \cdot, 1)$ は群である（乗法群）．
- $(\mathfrak{S}_n, \circ, \mathrm{id})$ は群であり，可換群でない（対称群）．
- $(\mathrm{GL}_n(\mathbb{F}_{998244353}), \cdot, I_n)$ は群であり，可換群でない（[[general-linear-group|一般線形群]]）．
