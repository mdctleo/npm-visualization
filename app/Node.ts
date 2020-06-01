export class DependencyNode {
    packageName: string
    version: string
    final: number
    quality: number
    popularity: number
    maintenance: number
    children: Array<DependencyNode> = []

    constructor(packageName: string, version: string, score: any) {
        this.packageName = packageName
        this.version = version

        this.final = score.final
        this.quality = score.detail.quality
        this.popularity = score.detail.popularity
        this.maintenance = score.detail.maintenance

    }


    public addChild(child: DependencyNode): void {
        this.children.push(child)
    }

}