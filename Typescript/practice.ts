function swap<T, V>(a: T, b: V): [V, T] {
  return [b, a];
}

const swap2 = <T,U>(a: T, b: U): [U,T] {
    return [b,a];
}

console.log(swap(1, "two"));
