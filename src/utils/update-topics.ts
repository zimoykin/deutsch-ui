import network from './network';

export const upsertTopics = async () => {
    network<string[]>({ method: 'GET', svc: 'svc', path: 'topic' })
        .then((data) => {
            localStorage.setItem('topic', JSON.stringify(data));
        }).catch((err: Error) => {
            console.log(err);
        });
};
