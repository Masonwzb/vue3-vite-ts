type A1 = <T>() => T extends string ? 1 : 2

type B2=  <T>() => T extends number ? 1 : 2

type C = A1 extends B2 ? 1 : 2

type IfEquals<X, Y, A = X, B = never> =
    (<T>() => T extends X ? 1 : 2) extends
        (<T>() => T extends Y ? 1 : 2)
        ? A : B;

/**
 * T2比T1多了readonly修饰符
 * T3比T1多了可选修饰符
 * 这里控制单一变量进行验证
 */
type T1 = {key1: string};
type T2 = {readonly key1: string};
type T3 = {key1?: string};

// A1 = false
type A11 = IfEquals<T1, T2, true , false>;
// A2 = false
type A21 = IfEquals<T1, T3, true , false>;

const test1 : A11 = false


