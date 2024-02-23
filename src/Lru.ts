import DLinkedLink from './DLinkedList'

export class Lru<K, T, V = { index: number; data: T }> {
    size: number
    map: Map<K, V>
    dLinkedListCase: DLinkedLink<T>

    constructor(size: number) {
        this.size = size
        this.map = new Map<K, V>()
        this.dLinkedListCase = new DLinkedLink<T>()
    }

    get = (key: K): T | undefined => {
        if (this.map.has(key)) {
            const {index} = this.map.get(key)

            /* 根据索引删除节点 */
            const data = this.dLinkedListCase.removeByIndex(index)

            /* 将被删除的节点作为头节点插入 */
            this.dLinkedListCase.insertFront(data)

            /* 更新 Map 信息 */
            this.map.set(key, {index: 0, data})

            return data
        }

        return
    }

    set = (key: K, {data}: V) => {
        /**
         * 如果超过了容量
         */
        if (this.dLinkedListCase.length() >= this.size) {
            /* 删除尾节点 */
            this.dLinkedListCase.removeTail()
            /* 将值在头节点插入 */
            this.dLinkedListCase.insertFront(data)
            /* 并存入 Map 中 */
            this.map.set(key, {index: 0, data})
        } else {
            /* 将新节点插入到头部 */
            this.dLinkedListCase.insertFront(data)
            /* 并存入 Map 中 */
            this.map.set(key, {index: this.dLinkedListCase.length(), data})
        }
    }
}