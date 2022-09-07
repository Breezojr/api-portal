import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToMany,
    JoinTable,
    BeforeInsert,
    BaseEntity,
} from 'typeorm';
import { FilterableField, KeySet, OffsetConnection } from '@nestjs-query/query-graphql';
import { Hash } from 'src/shared/helpers/hash.helper';

@ObjectType()
@KeySet(['id'])
@Entity()
export class User extends BaseEntity  {

    @FilterableField(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @FilterableField()
    @Column()
    firstName: string;

    @FilterableField()
    @Column()
    lastName: string;

    @FilterableField({ nullable: true })
    @Column({ nullable: true })
    gender?: string;

    @FilterableField(() => GraphQLISODateTime, { nullable: true })
    @Column({ nullable: true })
    dateOfBirth?: Date;

    @FilterableField({ nullable: true })
    @Column({ nullable: true })
    address?: string;

    @FilterableField({ nullable: true })
    @Column({ nullable: true })
    roleId: number;

    @FilterableField()
    @Column({ unique: true })
    email: string;

    @Column({ comment: 'Hashed password' })
    password: string;

    @FilterableField({ nullable: true, defaultValue: true })
    @Column({ default: true })
    active?: boolean;

    @FilterableField({ nullable: true })
    @Column({ nullable: true })
    residenceID?: string;

    @FilterableField({ nullable: true })
    @Column({ nullable: true })
    workID?: string;

    @FilterableField(() => GraphQLISODateTime)
    @CreateDateColumn()
    createdAt: Date;

    @FilterableField(() => GraphQLISODateTime)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => GraphQLISODateTime, { nullable: true })
    @DeleteDateColumn()
    deletedAt: Date;

    @BeforeInsert()
    async beforeInsert() {
        this.password = await Hash.make(this.password);
    }
}
