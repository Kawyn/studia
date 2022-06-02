#include "BinaryTree.hpp"

template <typename T>
Node<T> BinaryTree<T>::search(T v)
{
    Node<T> x = this->root;

    while (x != NULL x != x.value)
        x = v < x.value ? x.left : x.right;

    return x;
}

template <typename T>
void BinaryTree<T>::insert(T v)
{
    Node<T> n = new Node<T>(v);

    Node<T> y = NULL;
    Node<T> x = this->root;

    while (x != NULL)
    {

        y = x;

        if (n.value < x.value)
            x = x.left;
        else
            x = x.right;
    }

    n.parent = y;

    if (y == NULL)
        this->root = n;

    else if (n.value < y.value)
        y.left = n;
    else
        y.right = n;
};

public
Node<T> minimum()
{

    return this.minimum(this.root);
}

public
Node<T> minimum(Node<T> n)
{

    while (n.left != null)
        n = n.left;

    return n;
}

public
Node<T> succesor(Node<T> n)
{

    if (n.right != null)
        return this.minimum(n.right);

    Node<T> x = n.parent;

    while (x != null && n == x.right)
    {

        n = x;
        x = n.parent;
    }

    return n;
}

public

public
void delete (T v)
{

    this.delete(this.search(v));
}

public
void delete (Node<T> z)
{

    Node<T> y = (z.left == null || z.right == null) ? z : this.succesor(z);
    Node<T> x = (y.left != null) ? y.left : y.right;

    if (x != null)
        x.parent = y.parent;

    if (y.parent == null)
        this.root = x;

    else if (y == y.parent.left)
        y.parent.left = x;

    else
        y.parent.right = x;

    if (y != z)
        z.value = y.value;
}

public
String draw()
{

    return draw(root);
}

private
String draw(Node<T> n)
{

    if (n == null)
        return "";

    return n.value + "(" + draw(n.left) + ")(" + draw(n.right) + ")";
}
}

class Node<T extends Comparable<T>>
{

    T value;
    Node<T> parent, left, right;

public
    Node(T v)
    {

        this.value = v;
    }
}
