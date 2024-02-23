/**
 * 双向循环链表
 */

/**
 * 链表节点
 */
export type LinkedLinkNode<T> = {
    prev: LinkedLinkNode<T>
    data: T
    next: LinkedLinkNode<T>
} | null

/**
 * 链表
 */
export type LinkedLink<T> = {
    front: LinkedLinkNode<T>
    tail: LinkedLinkNode<T>
    length: number
} | null

class DLinkedLink<T> {
    linkedList: LinkedLink<T>

    constructor() {
        this.linkedList = null;
    }

    /**
     * 创建节点
     * @param data
     */
    private createLinkedNode = (data?: T): Exclude<LinkedLinkNode<T>, null> =>
        Object.create(null, {
            data,
            prev: null,
            next: null
        })

    /**
     * 清空链表
     */
    clear = () => {
        if (this.linkedList) {
            this.linkedList.front = null
            this.linkedList.tail = null
            this.linkedList.length = 0
        }
    }

    /**
     * 获取链表长度
     */
    length = (): number => this.linkedList?.length || 0

    /**
     * 返回链表的首节点
     */
    getFront = (): LinkedLinkNode<T> => this.linkedList?.front || null

    /**
     * 返回链表的尾节点
     */
    getTail = () => this.linkedList?.tail || null

    /**
     * 在头部插入
     */
    insertFront = (data?: T): LinkedLinkNode<T> => {
        const node = this.createLinkedNode(data)

        if (this.linkedList) {
            node.prev = this.linkedList.front?.prev || null
            this.linkedList.tail?.next = node

            node.next = this.linkedList.front || null
            this.linkedList.front?.prev = node

            this.linkedList.front = node
            this.linkedList.length++
        }

        return node
    }

    /**
     * 在尾部插入
     * @param data
     */
    insertTail = (data?: T): LinkedLinkNode<T> => {
        const node = this.createLinkedNode(data)

        if (this.linkedList) {
            node.next = this.linkedList.tail?.next || null
            this.linkedList.front?.prev = node

            node.prev = this.linkedList.tail
            this.linkedList.tail?.next = node

            this.linkedList.tail = node
            this.linkedList.length++
        }

        return node
    }

    /**
     * 在指定节点后面插入
     */
    insert = (target: LinkedLinkNode<T>, data?: T): LinkedLinkNode<T> => {
        if (target === this.linkedList?.tail) {
            return this.insertTail(data)
        }

        const node = this.createLinkedNode(data)

        target?.next?.prev = node
        node.next = target?.next || null

        target?.next = node
        node.prev = target

        this.linkedList?.length++

        return node
    }

    /**
     * 删除指定值的节点
     */
    removeByValue = (value: T): number => {
        let head = this.linkedList?.front
        let point = 0
        let count = 0

        while (point < this.linkedList?.length) {
            if (head?.data === value) {
                head.prev?.next = head.next
                head.next?.prev = head.prev

                count++
            }

            head = head?.next

            point++
        }

        this.linkedList?.length -= count

        return count
    };

    /**
     * 删除尾节点
     */
    removeTail = () => {
        if (this.linkedList) {
            this.linkedList.front?.prev = this.linkedList.tail?.prev
            this.linkedList.tail?.prev?.next = this.linkedList.front
            this.linkedList.tail = this.linkedList.tail?.prev || null
        }
    }

    /**
     * 删除链表指定索引的节点
     */
    removeByIndex = (idx: number): T | undefined => {
        let head = this.linkedList?.front
        let count = 0

        while (count < idx) {
            count++
            head = head?.next
        }

        head?.next?.prev = head?.prev
        head?.prev?.next = head?.next
        head?.prev = null
        head?.next = null

        this.linkedList?.length--

        return head?.data
    }

    /**
     * 根据索引查找节点
     * @param idx {number}
     */
    findNodeByIndex = (idx: number): LinkedLinkNode<T> | null => {
        let head = this.linkedList?.front || null
        let count = 0

        while (count < idx) {
            count++
            head = head?.next || null
        }

        return head
    }

    /**
     * 判断链表中是否存在指定元素
     */
    isExist = (value: T): boolean => {
        let head = this.linkedList?.front
        let point = 0

        while (point < this.linkedList?.length) {
            if (head?.data === value) {
                return true
            }

            point++
        }

        return false
    }
}

export default DLinkedLink