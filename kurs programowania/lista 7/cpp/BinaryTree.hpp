
template <typename T>
struct Node
{
public:
    T value;
    Node<T> *parent, *left, *right;

    Node<T>(T v);
    ~Node<T>(T v);
};

template <typename T>
class BinaryTree
{
public:
    BinaryTree<T>();
    Node<T> search(T v);
    void insert(T v);

private:
    Node<T> *root;
};
