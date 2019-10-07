#include <stdio.h>
int addeven(int n)
{
    int x;
    x = n % 2;
    if (x != 0)
    {
        printf("%d是奇数", n);
    }
    else
    {
        printf('%d是偶数', n);
    }
}

int main(void)
{
    int i = 5;
    addeven(i);
    return 0;
}