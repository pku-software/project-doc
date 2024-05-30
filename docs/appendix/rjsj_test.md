# 测试框架使用说明

`rjsj_test.hpp` 是仅头文件（Header-only）的 Mini-Lisp 测试库，提供了针对大作业要求的测试方法和测试数据。

## `RJSJ_TEST` 宏

格式：

```cpp
RJSJ_TEST(上下文结构体, 测试用例集...)
```

作用：对 *测试用例集* 中的每组测试用例，执行 *上下文结构体* 所定义的求值过程，检查该求值过程是否符合预期。随后，执行 `std::exit`：若所有测试均通过则程序成功退出，否则程序异常退出。

通常的用法是在 main 函数开头插入 `RJSJ_TEST` 宏。

## *上下文结构体*

需满足如下概念：

```cpp
// exposition-only
template <typename T>
concept TestCtx =
    std::movable<T> && 
    std::default_initializable<T> && 
    requires(T ctx, const std::string& str) {
        { ctx.eval(str) } -> std::convertible_to<std::string>;
    };
```

即：
- 可默认构造（`T{}` 合法）；
- 可移动（`t = T{}` 合法）；
- 对于 `std::string` 类型的 `input`，`t.eval(input)` 的结果可转换到 `std::string`。

对于每组测试用例集，测试框架的行为如下：
1. 默认初始化 *上下文结构体* 对象，记为 `ctx`；
2. 对每个测试输入（表达式）`input`，执行 `ctx.eval(input);`，结果记为 `output`；
3. 比较 `output` 与该测试的期望结果是否一致（宽松比较：具体格式不限，浮点数前四位有效数字相同即可）。

## *测试用例集*

`rjsj_test` 测试框架定义了如下 *测试用例集*：

- `Lv2`：完成 Lv.2 后，应当通过的测试；
- `Lv2Only`：完成 Lv.2 但尚未实现求值环境时，应当通过的测试；
- `Lv3`：完成 Lv.3 后，应当通过的测试；
- `Lv4`：完成 Lv.4 后，应当通过的测试；
- `Lv5`：完成 Lv.5 后，应当通过的测试；
- `Lv5Extra`：完成 Lv.5 且实现了内置过程 `>` 和 `*` 后，应当通过的测试；
- `Lv6`：完成 Lv.6 后，应当通过的测试；
- `Lv7`：完成 Lv.7 后，应当通过的测试（特殊形式部分）；
- `Lv7Lib`：完成 Lv.7 后，应当通过的测试（内置过程部分）；
- `Sicp`：完成 Lv.7 后，应当通过的更多实用测试例子；它们来自《计算机程序的构造和解释（第 2 版）》（Structure and Interpretation of Computer Programs，SICP）的作业题。

在 `RJSJ_TEST` 宏中指定上述测试用例集名称后，即可进行该用例集的测试。

## `RJSJ_TEST_NO_EXIT` 宏

不定义。

若在引入 `rjsj_test.hpp` 前定义该宏，则执行 `RJSJ_TEST` 后程序不会退出，继续执行后续语句。

## `RJSJ_TEST_ENABLED` 宏

默认定义为 `1`。可通过编译器选项、构建系统等方式定义 `RJSJ_TEST` 宏为 `0`，以禁用 `RJSJ_TEST` 宏的展开操作。
