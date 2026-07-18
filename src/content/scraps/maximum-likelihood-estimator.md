---
title: 最尤推定量
tags: [応用数理]
---

## 定義

観測値 $X_1, X_2, \ldots, X_n$ に対する[[likelihood|尤度]]関数を $L(\theta)$，母数空間を $\Theta$ とする．このとき，

$$
\widehat{\theta}
\in \operatorname*{arg\,max}_{\theta \in \Theta} L(\theta)
$$

を満たす推定量 $\widehat{\theta}$ を最尤推定量という．

対数関数は狭義単調増加であるため，最尤推定量は対数尤度関数 $\ell(\theta) = \log L(\theta)$ を最大化することでも求められる．積を和に変換できるので，実際の計算では対数尤度関数を用いることが多い．
