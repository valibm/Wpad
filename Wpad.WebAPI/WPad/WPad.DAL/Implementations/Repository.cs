using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using WPad.Core.Base;
using WPad.Core.Entities;
using WPad.Core.Interfaces;
using WPad.DAL.Context;

namespace WPad.DAL.Implementations
{
    public class Repository<TEntity> : IRepository<TEntity>
        where TEntity : class, IEntity
    {
        private readonly AppDbContext _context;

        public Repository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> exp = null, params string[] includes)
        {
            var query = GetQuery(includes);
            return exp is null
                ? await query.ToListAsync()
                : await query.Where(exp).ToListAsync();
        }

        //public async Task<List<TEntity>> GetAllFollowerHeadingsPaginateAsync<TOrderBy>(int page, int size, List<Follow> follow, Expression<Func<TEntity,
        //      TOrderBy>> orderBy, Expression<Func<TEntity, bool>> exp = null, params string[] includes)
        //{
        //    //var query = GetQuery(includes);
        //    IQueryable<TEntity> query;

        //    foreach (var follower in follow)
        //    {
        //        var loopQuery = GetQuery(includes);
        //        loopQuery.Where()
        //    }

        //    return exp is null
        //        ? await query.ToListAsync()
        //        : await query.Where(exp).ToListAsync();
        //}

        public async Task<List<TEntity>> GetAllOrderedAsync<TOrderBy>(Expression<Func<TEntity,
              TOrderBy>> orderBy, Expression<Func<TEntity, bool>> exp = null, params string[] includes)
        {
            var query = GetQuery(includes);
            return exp is null
                ? await query.OrderByDescending(orderBy).ToListAsync()
                : await query.Where(exp).OrderByDescending(orderBy).ToListAsync();
        }

        public async Task<List<TEntity>> GetAllPaginateAsync<TOrderBy>(int page, int size, Expression<Func<TEntity,
              TOrderBy>> orderBy, Expression<Func<TEntity, bool>> exp = null, params string[] includes)
        {
            var query = GetQuery(includes);
            return exp is null
                ? await query.OrderByDescending(orderBy).Skip((page - 1) * size).Take(size).ToListAsync()
                : await query.Where(exp).OrderByDescending(orderBy).Skip((page - 1) * size).Take(size).ToListAsync();
        }

        public async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> exp = null, params string[] includes)
        {
            var query = GetQuery(includes);
            return exp is null
                ? await query.FirstOrDefaultAsync()
                : await query.Where(exp).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(TEntity entity)
        {
            await _context.Set<TEntity>().AddAsync(entity);
        }

        public void Update(TEntity entity)
        {
            _context.Set<TEntity>().Update(entity);
        }

        public void Delete(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
        }

        private IQueryable<TEntity> GetQuery(params string[] includes)
        {
            var query = _context.Set<TEntity>().AsQueryable();
            if (includes != null)
            {
                foreach (var item in includes)
                {
                    query = query.Include(item);
                }
            }
            return query;
        }
    }
}
