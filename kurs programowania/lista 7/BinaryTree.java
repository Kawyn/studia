/**
 * Implementacja drzewa binarnego.
 */
public class BinaryTree<T extends Comparable<T>> {

    /**
     * Korzeń drzewa.
     */
    Node<T> root = null;

    public void insert(T v) {

        this.insert(new Node<T>(v));
    }

    public Node<T> minimum() {

        return this.minimum(this.root);
    }

    public Node<T> minimum(Node<T> n) {

        while (n.left != null)
            n = n.left;

        return n;
    }

    public Node<T> succesor(Node<T> n) {

        if (n.right != null)
            return this.minimum(n.right);

        Node<T> x = n.parent;

        while (x != null && n == x.right) {

            n = x;
            x = n.parent;
        }

        return n;
    }

    public void insert(Node<T> n) {

        Node<T> y = null;
        Node<T> x = root;

        while (x != null) {

            y = x;
            x = n.value.compareTo(x.value) < 0 ? x.left : x.right;
        }

        n.parent = y;

        if (y == null)
            this.root = n;

        else if (n.value.compareTo(y.value) < 0)
            y.left = n;
        else
            y.right = n;
    }

    public Node<T> search(T v) {

        Node<T> x = root;

        while (x != null && !v.equals(x.value))
            x = v.compareTo(x.value) < 0 ? x.left : x.right;

        return x;
    }

    public void delete(T v) {

        this.delete(this.search(v));
    }

    public void delete(Node<T> z) {

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

    public String draw() {

        return draw(root);
    }

    private String draw(Node<T> n) {

        if (n == null)
            return "";

        return n.value + "(" + draw(n.left) + ")(" + draw(n.right) + ")";
    }
}

class Node<T extends Comparable<T>> {

    T value;
    Node<T> parent, left, right;

    public Node(T v) {

        this.value = v;
    }
}
