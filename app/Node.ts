export class DependencyNode {
    packageName: string
    version: string
    children: Array<DependencyNode> = []

    constructor(packageName: string, version: string) {
        this.packageName = packageName
        this.version = version
    }


    public addChild(child: DependencyNode): void {
        this.children.push(child)
    }

}