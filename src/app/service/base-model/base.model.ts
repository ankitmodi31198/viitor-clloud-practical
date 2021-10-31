export abstract class BaseGetModel {
  abstract toLocal(oGetResponse: any);
}

export abstract class BasePostModel {
  abstract toRemote(data: any);
}
