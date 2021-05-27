import { graphql, useStaticQuery } from 'gatsby';

interface LegalSection {
    html: string;
    frontmatter: {
        sectionId: string;
    };
}

export interface LegalSectionQueryResult {
    allLegalSection: {
        sections: LegalSection[];
    };
}

export const useLocalDataSource = (): LegalSectionQueryResult => {
    return useStaticQuery(graphql`
        query LegalSectionQuery {
            allLegalSection: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/sections/legal/" } }) {
                sections: nodes {
                    html
                    frontmatter {
                        sectionId
                    }
                }
            }
        }
    `);
};

export const getSectionBySectionId = (res: LegalSectionQueryResult, id: string): LegalSection => {
    const sectionList = res.allLegalSection.sections.filter((section) => section.frontmatter.sectionId === id);
    if (sectionList.length === 0) {
        throw new Error(`Could not find section ${id} by id.`);
    } else if (sectionList.length > 1) {
        throw new Error(`Found section ${id} multiple times. Make sure the id is unique.`);
    } else {
        return sectionList[0];
    }
};
