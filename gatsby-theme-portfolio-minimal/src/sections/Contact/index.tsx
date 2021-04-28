import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Section } from '../../components/Section';
import { GatsbyImageQueryResultList } from '../../types/graphql';
import { getGatsbyImageByFileName } from '../../utils/getGatsbyImageByFileName';
import { SocialProfile, SocialProfiles } from '../../components/SocialProfiles';
import * as classes from './style.module.css';

interface ContactSectionProps {
    anchor: string;
    heading?: string;
    description?: string;
    imageFileName: string;
    name: string;
    email: string;
    socialProfiles?: SocialProfile[];
}

export function ContactSection(props: ContactSectionProps): React.ReactElement {
    const images: GatsbyImageQueryResultList = useStaticQuery(query);

    return (
        <Section anchor={props.anchor} heading={props.heading} additionalClasses={[classes.Contact]}>
            {props.description && <p className={classes.Description}>{props.description}</p>}
            <div className={classes.Profile}>
                <GatsbyImage
                    className={classes.Avatar}
                    image={getGatsbyImageByFileName(images, props.imageFileName)}
                    alt={`Profile ${props.name}`}
                />
                <div className={classes.ContactDetails}>
                    <div className={classes.Name}>{props.name}</div>
                    <u>
                        <a href={`mailto:${props.email}`}>{props.email}</a>
                    </u>
                </div>
            </div>
            {props.socialProfiles && <SocialProfiles shownProfiles={props.socialProfiles} withIcon={true} />}
        </Section>
    );
}

const query = graphql`
    query ImagesContactSectionFormat {
        allFile(filter: { absolutePath: { regex: "/images/" } }) {
            images: nodes {
                name
                ext
                childImageSharp {
                    gatsbyImageData(width: 140, quality: 80, placeholder: BLURRED)
                }
            }
        }
    }
`;
