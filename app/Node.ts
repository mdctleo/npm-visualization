export class Node {
    packageName: string
    version: string
    children: Array<Node> = null

    constructor(packageName: string, version: string) {
        this.packageName = packageName
        this.version = version
    }


    public addChild(child: Node): void {
        this.children.push(child)
    }

}