import * as React from 'react';
import '../index/index.scss';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function LanguageRow(props: any) {
    const language: ILanguage = props.language

    return (
      <tr key={props.index}>
        <td>{language.emoji}</td>
        <td>{language.name}</td>
        <td>{language.code}</td>
      </tr>
    )
}

interface ILanguage {
    emoji: string;
    name: string;
    code: string;
}

class Language extends React.Component<any, any> {   

    public render(): JSX.Element {
        const { data: { loading, error, languages } } = this.props;

        if (loading) {
            return <p>Loading data.... </p>
        }

        if (error) {
            return <p>GraphQL error occured.... </p>
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Code</th>
                    </tr>
                </thead>
                <tbody>
                {languages.map((language: ILanguage, index: number) =>
                    <LanguageRow key={index} language={language} index={index} />
                )}
                </tbody>
            </table>
        );
    }

}


export default graphql(gql`
    query{
        languages{
            name,
            code,
            native
        }
    }
    `,
    {
    options: props => ({
        fetchPolicy: "cache-and-network",
        variables: {
            nextPageKey: 0,
        },
    })
})(Language);
